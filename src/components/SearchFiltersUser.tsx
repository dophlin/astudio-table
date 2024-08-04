import { useCallback, useEffect, useState, useContext } from "react";
import DropdownFilter from "./DropdownFilter";
import { AppContext } from "../AppContext";

export default ({ keys }: { keys: string[] }) => {
    const context = useContext(AppContext);
    const [activeFilter, setActiveFilter] = useState<string | null>()
    const [pageSize, setPageSize] = useState<number>(5)

    const activeFilterHandler = useCallback((filterName: string, filterValue: string | undefined) => {
        switch (filterName) {
            case "Search":
                if(activeFilter === filterName) {
                    context?.setFilters({
                        searchQuery: filterValue,
                        filterKey: context.filters.filterKey,
                        filterValue: context.filters.filterValue
                    });
                }
                break;
            default:
                if(activeFilter === filterName) {
                    context?.setFilters({
                        searchQuery: "",
                        filterKey: filterName,
                        filterValue: filterValue
                    });
                    context?.setPagination({
                        pageSize: context.pagination.pageSize,
                        currentPage: 1
                    });
                }
        }
    }, [context?.filters.filterKey, context?.filters.filterValue, activeFilter])

    useEffect(() => {
        console.log("activeFilter:", activeFilter);
        console.log("context?.filters.filterKey:", context?.filters.filterKey);
    }, [activeFilter, context?.filters.filterKey])

    useEffect(() => {
        context?.setPagination({
            pageSize: pageSize ? pageSize : 5,
            currentPage: 1
        });
    }, [pageSize])

    const handleUnfocus = useCallback(() => {
        setActiveFilter(null);
    }, []);

    return (
        <>
            <div className="-mx-4 -my-2 overflow-x-auto sm:mx-0 sm:overflow-visible">
                <div className="flex relative z-20 flex-row divide-x my-8">
                    <div>
                        <DropdownFilter type="DROPDOWN" selectedItem={pageSize ? pageSize : 5} items={[5, 10, 20, 50]} isShown={activeFilter === "Entries"} resetValue={false} label="Entries" onFocus={() => {setActiveFilter("Entries")}} onTermChanges={(page) => setPageSize(page)} />
                    </div>
                    <div className="px-5 ml-5">
                        <DropdownFilter type="SEARCH" isShown={activeFilter === "Search"} resetValue={context?.filters.searchQuery == ""} label="Search" onFocus={() => {setActiveFilter("Search")}} onTermChanges={(value) => activeFilterHandler("Search", value)} />
                    </div>
                    <div className="flex relative flex-row pl-5 gap-8">
                        {keys.map(key => {
                            return <DropdownFilter 
                                type="FILTER" 
                                isShown={activeFilter === key} 
                                resetValue={context?.filters.filterKey != key} 
                                label={key} 
                                onFocus={() => {setActiveFilter(key)}} 
                                onTermChanges={(value) => activeFilterHandler(key, value)} 
                            />
                        }
                        )}
                    </div>
                </div>
                {activeFilter && <span className="absolute w-screen h-screen top-0 z-10" onClick={handleUnfocus} />}
            </div>
        </>
    )
}
