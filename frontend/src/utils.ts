export function formatDate(iso: string): string {
    try {
        return Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
        }).format(new Date(iso));
    } catch {
        return iso;
    }
}