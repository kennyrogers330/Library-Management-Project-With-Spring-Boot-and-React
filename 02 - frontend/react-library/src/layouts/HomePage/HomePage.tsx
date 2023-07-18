import { Carousel } from "./components/Carousel";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Heros } from "./components/Heroes";
import { LibrayServices } from "./components/LibraryServices";

export const HomePage = () => {
    return (
        <>
            <ExploreTopBooks/>
            <Carousel/>
            <Heros/>
            <LibrayServices/>
        </>
    );
}