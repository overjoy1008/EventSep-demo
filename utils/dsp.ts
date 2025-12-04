/**
 * Utility functions for Audio Processing and Spectrogram Generation
 * Simulates Python/Librosa style visualization in the browser.
 */

// Magma Colormap (Approximate for research paper look)
// Black -> Purple -> Red -> Orange -> White
const MAGMA_CMAP = [
    [0, 0, 4],       // Very dark blue/black
    [40, 17, 90],    // Dark Purple
    [113, 31, 129],  // Purple
    [182, 54, 121],  // Magenta
    [241, 96, 93],   // Red-Orange
    [251, 136, 97],  // Orange
    [252, 253, 191]  // Yellow/White
];

function getMagmaColor(value: number): [number, number, number] {
    const clamped = Math.max(0, Math.min(1, value));
    const scaled = clamped * (MAGMA_CMAP.length - 1);
    const idx = Math.floor(scaled);
    const nextIdx = Math.min(MAGMA_CMAP.length - 1, idx + 1);
    const t = scaled - idx;

    const c1 = MAGMA_CMAP[idx];
    const c2 = MAGMA_CMAP[nextIdx];

    return [
        Math.round(c1[0] + (c2[0] - c1[0]) * t),
        Math.round(c1[1] + (c2[1] - c1[1]) * t),
        Math.round(c1[2] + (c2[2] - c1[2]) * t)
    ];
}

/**
 * Generates a spectrogram from an AudioBuffer.
 * Uses a simplified STFT approach for client-side visualization.
 */
export const generateSpectrogram = async (
    audioBuffer: AudioBuffer,
    canvas: HTMLCanvasElement
) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions
    const width = canvas.width;
    const height = canvas.height;
    const legendWidth = 20; // Width reserved for colorbar
    const plotWidth = width - legendWidth;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    // Librosa defaults requested: n_fft=1024, hop_length=256
    const n_fft = 1024;
    const hop_length = 256;
    
    // Compute STFT (Simplified for performance)
    // We map time to X pixels, and frequency to Y pixels (Log scale)
    const samplesPerPixel = Math.max(hop_length, Math.floor(channelData.length / plotWidth));
    
    const imageData = ctx.createImageData(plotWidth, height);
    const data = imageData.data;

    // Min/Max for dB scaling (Typical values for visualization)
    const minDb = -80;
    const maxDb = 0;

    // Freq range for Log scale
    const minFreq = 20;
    const maxFreq = sampleRate / 2;
    const logMin = Math.log10(minFreq);
    const logMax = Math.log10(maxFreq);
    const logRange = logMax - logMin;

    // Precompute Hanning window
    const window = new Float32Array(n_fft);
    for (let i = 0; i < n_fft; i++) {
        window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (n_fft - 1)));
    }

    for (let x = 0; x < plotWidth; x++) {
        // Calculate start sample for this column
        const startIdx = Math.floor(x * (channelData.length / plotWidth));
        
        if (startIdx + n_fft >= channelData.length) break;

        // Extract and window frame
        const frame = new Float32Array(n_fft);
        for (let i = 0; i < n_fft; i++) {
            frame[i] = channelData[startIdx + i] * window[i];
        }

        // Compute FFT magnitude
        const magnitudes = performFFT(frame);
        
        // Map magnitudes to pixels (Y-axis = Log Frequency)
        // 0 at bottom (Low Freq), Height at top (High Freq)
        for (let y = 0; y < height; y++) {
            // Normalized Y (0 at bottom, 1 at top)
            // Canvas Y is 0 at top, so we invert
            const normalizedY = 1 - (y / height);
            
            // Map pixel Y to frequency (Log scale)
            const logFreq = logMin + (normalizedY * logRange);
            const freq = Math.pow(10, logFreq);
            
            // Map frequency to FFT bin
            // Bin 0 = 0Hz, Bin N/2 = Nyquist
            const binIndex = Math.floor((freq / (sampleRate / 2)) * (magnitudes.length - 1));
            const safeBin = Math.max(0, Math.min(magnitudes.length - 1, binIndex));
            
            // Get Magnitude and convert to dB
            const mag = magnitudes[safeBin];
            const db = 20 * Math.log10(mag + 1e-6);
            
            // Normalize dB to 0-1 for color mapping
            let normVal = (db - minDb) / (maxDb - minDb);
            normVal = Math.max(0, Math.min(1, normVal)); // Clamp
            
            // Get color
            const [r, g, b] = getMagmaColor(normVal);
            
            const idx = (y * plotWidth + x) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
        }
    }
    
    ctx.putImageData(imageData, 0, 0);

    // Draw Colorbar Legend on the right
    drawColorbar(ctx, width, height, legendWidth, plotWidth);
};

function drawColorbar(ctx: CanvasRenderingContext2D, width: number, height: number, legendWidth: number, startX: number) {
    for (let y = 0; y < height; y++) {
        const normalizedY = 1 - (y / height); // 0 at bottom, 1 at top
        const [r, g, b] = getMagmaColor(normalizedY);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(startX, y, legendWidth, 1);
    }
    
    // Add text labels
    ctx.fillStyle = 'white';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    // Top (0dB)
    ctx.fillText('0dB', width - 2, 10);
    // Bottom (-80dB)
    ctx.fillText('-80dB', width - 2, height - 2);
}

// Simple FFT implementation
function performFFT(input: Float32Array): Float32Array {
    const n = input.length;
    // We only need magnitude, can skip some steps if optimized, 
    // but full FFT is standard.
    const real = new Float32Array(input);
    const imag = new Float32Array(n).fill(0);

    // Bit reversal
    let j = 0;
    for (let i = 0; i < n - 1; i++) {
        if (i < j) {
            [real[i], real[j]] = [real[j], real[i]];
            [imag[i], imag[j]] = [imag[j], imag[i]];
        }
        let k = n / 2;
        while (k <= j) {
            j -= k;
            k /= 2;
        }
        j += k;
    }

    // Butterfly
    for (let len = 2; len <= n; len *= 2) {
        const angle = -2 * Math.PI / len;
        const wlen_r = Math.cos(angle);
        const wlen_i = Math.sin(angle);
        
        for (let i = 0; i < n; i += len) {
            let w_r = 1;
            let w_i = 0;
            for (let j = 0; j < len / 2; j++) {
                const u_r = real[i + j];
                const u_i = imag[i + j];
                const v_r = real[i + j + len / 2] * w_r - imag[i + j + len / 2] * w_i;
                const v_i = real[i + j + len / 2] * w_i + imag[i + j + len / 2] * w_r;
                
                real[i + j] = u_r + v_r;
                imag[i + j] = u_i + v_i;
                real[i + j + len / 2] = u_r - v_r;
                imag[i + j + len / 2] = u_i - v_i;
                
                const temp_r = w_r * wlen_r - w_i * wlen_i;
                w_i = w_r * wlen_i + w_i * wlen_r;
                w_r = temp_r;
            }
        }
    }

    // Magnitude
    const output = new Float32Array(n / 2);
    for (let i = 0; i < n / 2; i++) {
        output[i] = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
    }
    return output;
}
