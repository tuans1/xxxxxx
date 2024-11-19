export async function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), milliseconds);
    });
}

export function random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min));
}
