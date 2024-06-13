import { getPokemonById } from '../../src/js-foundation/06-promises';



describe('06-promises', () => {

    it("getPokemonById should return a pokemon", async () => {


        const pokemonId = 1

        const pokemonName = await getPokemonById(pokemonId);


        expect(pokemonName).toBe('bulbasaur')

    });

    it("should return an error if pokemon does not exist", async () => {

        const pokemonId = 1000000;
        try {
            const pokemonName = await getPokemonById(pokemonId);
            expect(true).toBeFalsy()
        } catch (error) {
            expect(error).toBe(`Pokemon not found with id ${pokemonId}`)
        }
    })


})