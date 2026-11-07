// Clear all schemas from head
export function removeSchema() {
    const all = document.querySelectorAll(
        "head script[type='application/ld+json']",
    );
    if (all.length) {
        all.forEach((i) => i.remove());
    }
}
