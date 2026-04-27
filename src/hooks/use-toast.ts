export function useToast() {
    const toast = ({ title, description, variant }: { title?: string, description?: string, variant?: string }) => {
        console.log(`[Toast ${variant || 'default'}] ${title}: ${description}`);
    };

    return { toast };
}
