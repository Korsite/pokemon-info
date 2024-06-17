import {renderHook, waitFor} from "@testing-library/react";
import {usePokemon} from "../../../src/pokemon/hooks/index.js";

describe('Tests in usePokemon hook', () => {
    test('Should return a response when fetching data', async () => {
        const { result } = renderHook(() => usePokemon());

        await waitFor(() => {
            expect(result.current.pokemonList.length).toBeGreaterThan(0);
        }, { timeout: 10000 });

        expect(result.current.isFetchingRef.current).toBe(true);
    }, 10000); // Establecer un timeout de 10 segundos para este test

})
