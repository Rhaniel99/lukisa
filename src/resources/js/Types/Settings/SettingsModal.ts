import type { SettingsTab } from "./SettingsTabs";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: SettingsTab; // opcional, mas útil
}
