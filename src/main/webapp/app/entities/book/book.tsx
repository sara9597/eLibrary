import React, { useState, useEffect } from 'react';
import './book.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Input, DropdownItem } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './book.reducer';
import { IBook } from 'app/shared/model/book.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import MenuItem from 'app/shared/layout/menus/menu-item';

export const Book = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));

  const bookList = useAppSelector(state => state.book.entities);
  const loading = useAppSelector(state => state.book.loading);
  const totalItems = useAppSelector(state => state.book.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };
  const [filter, updateFilter] = useState('');

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;
  const bookEntity = useAppSelector(state => state.book.entity);

  const sortMenuItems = () => (
    <>
      <DropdownItem onClick={sort('title')}>
        <FontAwesomeIcon icon="sort" fixedWidth />
        Title
      </DropdownItem>
      <DropdownItem onClick={sort('author.fullname')}>
        <FontAwesomeIcon icon="sort" fixedWidth />
        Author
      </DropdownItem>
      <DropdownItem onClick={sort('year')}>
        <FontAwesomeIcon icon="sort" fixedWidth />
        Year
      </DropdownItem>
    </>
  );
  return (
    <div className="bookPage">
      <h2 id="book-heading" data-cy="BookHeading">
        <Translate contentKey="librarApp.book.home.title">Books</Translate>
      </h2>
      <div className="d-flex bookHeaderComponents">
        <div className="d-flex inputSort">
          <Input
            type="search"
            placeholder="Search books..."
            className="form-control me-2 booksSearch"
            defaultValue={filter}
            onChange={e => updateFilter(e.target.value)}
            style={{ width: '20vw' }}
          />
          <NavDropdown className="dropdownMenu" icon="book" name="Sort By" id="sort-menu" data-cy="sortMenu">
            {sortMenuItems()}
          </NavDropdown>
        </div>
        <div className="d-flex justify-content-end refreshCreate">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="librarApp.book.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="librarApp.book.home.createLabel">Create new Book</Translate>
          </Link>
        </div>
      </div>
      <div className="catalogContainer">
        {bookList && bookList.length > 0
          ? bookList.map(
              (book, i) =>
                book.title.toLowerCase().includes(filter) && (
                  <Link key={i} to={`${match.url}/${book.id}`}>
                    <div className="catalog__item" key={book.id}>
                      <div className="catalog__item__img">
                        {book.image ? (
                          <img src={book.image ? `data:${book.imageContentType};base64,${book.image}` : null} alt={book.title} />
                        ) : (
                          <img className="imgPlaceholder" />
                        )}
                        <div className="catalog__item__resume">{book.note}</div>
                      </div>
                      <div className="catalog__item__footer">
                        <div className="catalog__item__footer__name">
                          <span>
                            {book.title} ({book.year})
                          </span>
                          {isAdmin && (
                            <div className="btn-group flex-btn-group-container editDelete">
                              <Button
                                tag={Link}
                                to={`${match.url}/${book.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                                color="primary"
                                size="sm"
                                data-cy="entityEditButton"
                                className="edit"
                              >
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.edit">Edit</Translate>
                                </span>
                              </Button>
                              <Button
                                className="delete"
                                tag={Link}
                                to={`${match.url}/${book.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                                color="danger"
                                size="sm"
                                data-cy="entityDeleteButton"
                              >
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.delete">Delete</Translate>
                                </span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
            )
          : !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="librarApp.book.home.notFound">No Books found</Translate>
              </div>
            )}
      </div>
      {totalItems ? (
        <div className={bookList && bookList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount 
            page={paginationState.activePage} 
            total={totalItems} 
            itemsPerPage={paginationState.itemsPerPage} 
            i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Book;
