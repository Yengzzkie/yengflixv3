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
    allMovies: [],
    setAllMovies: (data) => set({ allMovies: data })
}))

// state for browsing all TV shows
export const useBrowseTv = create((set) => ({
    allTv: [],
    setAllTv: (data) => set({ allTv: data })
}))

// state for page navigation when browsing movies
export const usePagination = create((set) => ({
    page: 1,
    setPage: (data) => set({ page: data })
}))

// state for my list
export const useMyList = create((set) => ({
    myList: [],
    setMyList: (data) => set({ myList: data })
}))

// state for movie/tv search 
export const useSearchResult = create((set) => ({
    searchResult: [],
    setSearchResult: (data) => set({ searchResult: data })
}))

export const useLoading = create((set) => ({
    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool })
}))