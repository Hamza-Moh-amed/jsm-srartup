import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
const SearchForm = ({ query }: { query?: string }) => {
  // query is a prop coming from the (root)/page.tsx
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue=""
        placeholder="Search Startup"
        className="search-input"
      />
      <div className="flex gap-2">
        //! SearchFormReset created seperately because it's a client component
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
