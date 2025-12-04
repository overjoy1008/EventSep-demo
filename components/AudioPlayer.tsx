import React from 'react';

interface AudioPlayerProps {
    src: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
    return (
        <div className="mt-2 w-full">
            <audio 
                controls 
                className="w-full h-8 block accent-blue-600" 
                src={src || undefined}
            />
        </div>
    );
};

export default AudioPlayer;