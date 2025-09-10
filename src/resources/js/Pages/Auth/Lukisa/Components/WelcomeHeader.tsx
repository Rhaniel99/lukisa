import React from 'react';

interface WelcomeHeaderProps {
    username: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ username }) => {
    return (
        <div className="text-center mb-12">
            <h1
                className="text-4xl font-bold mb-4"
                style={{ color: "#0D0000" }}
            >
                Bem-vindo ao Lukisa, {username}!
            </h1>
            <p className="text-lg" style={{ color: "#737065" }}>
                Escolha um serviço para começar
            </p>
        </div>
    );
};

export default WelcomeHeader;
