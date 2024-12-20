import { create } from "zustand";

// state for top 10 movies
export const useMovieData = create((set) => ({
    movieData: [],
    setMovieData: (data) => set({ movieData: data })
}))

// state for top 10 tv shows
export const useTvData = create((set) => ({
    tvData: [],
    setTvData: (data) => set({ tvData: data })
}))

// state for browsing all movies
export const useBrowseMovies = create((set) => ({
    browseMovies: [],
    setBrowseMovies: (data) => set({ browseMovies: data })
}))

// state for browsing all TV shows
export const useBrowseTv = create((set) => ({
    browseTv: [],
    setBrowseTv: (data) => set({ browseTv: data })
}))

// state for page navigation when browsing movies
export const useMoviePage = create((set) => ({
    moviePage: 1,
    setMoviePage: (data) => set({ moviePage: data })
}))

export const useLoading = create((set) => ({
    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool })
}))