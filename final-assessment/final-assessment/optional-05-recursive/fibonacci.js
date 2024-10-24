function fibonacci(n) {
    if (n === 0) return [0];
    if (n === 1) return [0, 1];

    const fibonacciContainer = fibonacci(n - 1);

    const nextFib = fibonacciContainer[fibonacciContainer.length - 1] + fibonacciContainer[fibonacciContainer.length - 2];
    fibonacciContainer.push(nextFib);

    return fibonacciContainer;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
