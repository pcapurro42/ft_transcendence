function generateNumber(max)
{
    let value = Math.random(); // génère un nombre aléatoire entre 0 et 1 (décimal)
    value = value * max; // étend la plage de nombres à $max
    value = Math.floor(value); // arondit le nombre décimal à un entier
    return (value);
}
