// Import the built-in File System module
const fs = require('fs');
/**
 * Converts a string representation of a number from a given base to a BigInt.
 * @param {string} value The string to convert (e.g., "111", "e1b").
 * @param {number} base The base of the number (e.g., 2, 16).
 * @returns {BigInt}
 */
function parseBigInt(value, base) {
    // A mapping for characters to their integer value.
    // Handles digits 0-9 and letters a-f for hexadecimal etc.
    const charToValue = {};
    '0123456789abcdefghijklmnopqrstuvwxyz'.split('').forEach((char, i) => {
        charToValue[char] = i;
    });

    let result = 0n; // Initialize result as a BigInt
    const bigIntBase = BigInt(base); // Convert the base to a BigInt

    for (const char of value.toLowerCase()) {
        const digitValue = BigInt(charToValue[char]);
        // The core logic: result = (result * base) + digitValue
        result = result * bigIntBase + digitValue;
    }

    return result;
}
// The main function where our logic will go
// The main function that executes the complete solution
function solve() {
    const filePath = process.argv[2];

    if (!filePath) {
        console.error("Error: Please provide the path to the JSON file.");
        return;
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        // 1. Get the number of roots required, k
        const k = data.keys.k;

        // 2. Decode the first 'k' roots
        const decodedRoots = [];
        for (let i = 1; i <= k; i++) {
            const rootKey = i.toString();
            const rootInfo = data[rootKey];
            
            const base = parseInt(rootInfo.base, 10);
            const value = rootInfo.value;

            const decodedRoot = parseBigInt(value, base);
            decodedRoots.push(decodedRoot);
        }

        // 3. Multiply all the decoded roots together
        let product = 1n; // Start with BigInt 1
        for (const root of decodedRoots) {
            product = product * root;
        }

        // 4. Apply the sign correction: (-1)^(k)
        // If (k) is odd, the result should be negative.
        if (k % 2 !== 0) {
            product = -product;
        }

        // 5. Print the final answer
        console.log("The constant term 'c' of the polynomial is:");
        console.log(product.toString());


    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

// Run the main function
solve();