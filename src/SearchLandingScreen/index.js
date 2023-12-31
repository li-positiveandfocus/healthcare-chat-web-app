import React, { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { SearchResults } from "./SearchResults/SearchResults";
import { useLocation } from "react-router";
import { useBusinessSearch } from "../services/officialyelp/useBusinessSearch";
import { SearchResultsSummary } from "./SearchResults/SearchResultsSummary/SearchResultsSummary";
import * as authService from "../services/auth-service";

const SearchComponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const locationParam = params.get("find_loc");
  const termParam = params.get("find_desc");
  const searchInputParams = [termParam, locationParam];
  const [businesses, amountResults, searchParams, performSearch] =
    useBusinessSearch(searchInputParams);

  const [currentUser, setCurrentUser] = useState(undefined);

  const getProfile = async () => {
    try {
      const user = await authService.profile();
      setCurrentUser(user);
    } catch (e) {
      setCurrentUser(undefined);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  let loggedIn = currentUser && currentUser.username !== undefined;

  if (!locationParam || !termParam) {
    return (
      <div>
        <SearchBar search={search} />
        <div className="container">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <h3>Please enter the location</h3>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    );
  }

  function search(searchInputParams) {
    performSearch(searchInputParams);
  }

  return (
    <div>
      <SearchBar
        term={termParam}
        location={locationParam}
        loggedIn={loggedIn}
        currentUser={currentUser}
        onSearchLandingPage={true}
        search={search}
      />
      <SearchResultsSummary term={termParam} location={locationParam} />
      <SearchResults businesses={businesses} loggedIn={loggedIn} />
    </div>
  );
};
export default SearchComponent;
