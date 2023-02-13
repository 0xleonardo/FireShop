interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    changeItemsPerPage: (itemNumber: number) => void;
    currentPage: number;
    currentItems: number;
}

export const Pagination = (props: PaginationProps) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <div className="pagination_select">
                Items per page
                <select onChange={(e: any) => props.changeItemsPerPage(e.target.value)} value={props.itemsPerPage}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className="pagination_numbers">
                {pageNumbers.map(number => (
                    <button onClick={() => props.paginate(number)} key={number}
                            style={{backgroundColor: number === props.currentPage ? "#bb4227" : "#FF4B2B"}}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}