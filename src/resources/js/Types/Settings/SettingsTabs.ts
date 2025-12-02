export type SettingsTab = "profile" | "account" | "privacy";

export interface SettingsMenuItem {
    key: SettingsTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}
