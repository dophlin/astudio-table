import { useCallback, useContext, useEffect, useState } from "react";
import LeftArrow from '../assets/left-arrow.svg'
import RightArrow from '../assets/right-arrow.svg'
import { AppContext } from "../AppContext";

interface PaginationProps {
    pagesCount: number;
    activePage: (pageNo: number) => void;
}

export default function Pagination({ pagesCount, activePage }: PaginationProps) {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const context = useContext(AppContext);

    useEffect(() => {
        setCurrentPage(context!.pagination.currentPage)
    }, [context?.pagination.currentPage]);

    const pageChangeHandler = useCallback((page: number) => {
        context!.setPagination({
            pageSize: context!.pagination.pageSize,
            currentPage: page
        });
        activePage(page)
    }, [activePage, context])

    const nextPage = () => {
        if (currentPage < pagesCount) {
            pageChangeHandler(currentPage + 1)
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            pageChangeHandler(currentPage - 1)
        }
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        const showEllipsis = pagesCount > 7;

        if (showEllipsis) {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pageButtons.push(renderButton(i));
                }
                pageButtons.push(<span key="ellipsis1">...</span>);
                pageButtons.push(renderButton(pagesCount));
            } else if (currentPage >= pagesCount - 3) {
                pageButtons.push(renderButton(1));
                pageButtons.push(<span key="ellipsis2">...</span>);
                for (let i = pagesCount - 4; i <= pagesCount; i++) {
                    pageButtons.push(renderButton(i));
                }
            } else {
                pageButtons.push(renderButton(1));
                pageButtons.push(<span key="ellipsis3">...</span>);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageButtons.push(renderButton(i));
                }
                pageButtons.push(<span key="ellipsis4">...</span>);
                pageButtons.push(renderButton(pagesCount));
            }
        } else {
            for (let i = 1; i <= pagesCount; i++) {
                pageButtons.push(renderButton(i));
            }
        }

        return pageButtons;
    };

    const renderButton = (page: number) => (
        <button
            key={page}
            onClick={() => pageChangeHandler(page)}
            className={`page-button ${page === currentPage ? 'font-bold text-lg mb-4' : 'text-sm'}`}
        >
            {page}
        </button>
    );

    return (
        <div className="flex flex-row w-full items-center justify-center gap-7 my-5 select-none">
            <img src={LeftArrow} onClick={prevPage} className={`logo w-5 ${currentPage === 1 ? 'opacity-20' : 'opacity-100'} cursor-pointer`} alt="Previous" />
            {renderPageButtons()}
            <img src={RightArrow} onClick={nextPage} className={`logo w-5 ${currentPage === pagesCount ? 'opacity-20' : 'opacity-100'} cursor-pointer`} alt="Next" />
        </div>
    );
}