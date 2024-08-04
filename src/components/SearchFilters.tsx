import SearchFiltersUser from "./SearchFiltersUser";
import SearchFiltersProduct from "./SearchFiltersProduct";

export default ({ keys, type }: { keys: string[] | undefined, type: string }) => {
    if(type === 'User' && keys) {
        return <SearchFiltersUser keys={keys} />;
    } else if (type === 'Product') {
        return <SearchFiltersProduct />
    } else return null;
}
