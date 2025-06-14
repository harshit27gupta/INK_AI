// Convert UTC to IST
export const convertToIST = (utcDate) => {
    if (!utcDate) return '';
    
    try {
        const date = new Date(utcDate);
        return date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error('Date conversion error:', error);
        return utcDate;
    }
};

// Format date for display
export const formatDate = (date) => {
    if (!date) return '';
    
    try {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });
    } catch (error) {
        console.error('Date formatting error:', error);
        return date;
    }
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (date) => {
    if (!date) return '';
    
    try {
        const now = new Date();
        const past = new Date(date);
        const diffInSeconds = Math.floor((now - past) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        
        return formatDate(date);
    } catch (error) {
        console.error('Relative time error:', error);
        return date;
    }
}; 