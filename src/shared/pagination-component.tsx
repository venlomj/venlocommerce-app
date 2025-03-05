import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
      <Pagination>
          <PaginationContent>
              <PaginationItem>
                  <PaginationPrevious
                      onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                      aria-disabled={currentPage === 1}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                      <PaginationLink
                          onClick={() => onPageChange(index + 1)}
                          isActive={index + 1 === currentPage}
                          className="cursor-pointer"
                      >
                          {index + 1}
                      </PaginationLink>
                  </PaginationItem>
              ))}

              <PaginationItem>
                  <PaginationNext
                      onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                      aria-disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
              </PaginationItem>
          </PaginationContent>
      </Pagination>
  );
};

export default PaginationComponent;
