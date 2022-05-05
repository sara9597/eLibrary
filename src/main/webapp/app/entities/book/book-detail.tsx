import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { getEntity } from './book.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import UserBookLendingUpdate from '../user-book-lending/user-book-lending-update';
import { createEntity } from '../user-book-lending/user-book-lending.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { LendingStatus } from 'app/shared/model/enumerations/lending-status.model';

export const BookDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const userBookLendingEntity = useAppSelector(state => state.userBookLending.entity);
  const bookEntity = useAppSelector(state => state.book.entity);
  const userEntiy = useAppSelector(state =>
    state.libraryUser.entities.filter(
      user => user.fullname === state.authentication.account.firstName + state.authentication.account.lastName
    )
  );
  const entity = {
    loantime: '2022-05-05T17:09:01Z',
    returntime: '2022-05-05T17:09:01Z',
    status: 'LENDED',
    user: {
      id: userEntiy[0].id,
    },
    book: {
      id: bookEntity.id,
    },
  };
  const lendBook = () => {
    /* eslint-disable no-console */ console.log(userEntiy); /* eslint-enable no-console */
    dispatch(createEntity(entity));
  };
  return (
    <div
      className="bookDetailContainer"
      style={{ background: `url(data:${bookEntity.imageContentType};base64,${bookEntity.image} ) repeat scroll center center / cover` }}
    >
      <div className="detailCard">
        <div className="imageContainer">
          <img src={`data:${bookEntity.imageContentType};base64,${bookEntity.image}`} />
        </div>
        <div className="detailContainer">
          <div className="aboutBook">
            <h1>
              {bookEntity.title} ({bookEntity.year})
            </h1>
            <h3 style={{ paddingBottom: '2rem', paddingLeft: '2.5rem' }}>{bookEntity.author ? bookEntity.author.fullname : ''}</h3>
            <p style={{ paddingLeft: '2.5rem' }}>{bookEntity.note}</p>
            <div className="bookGenres">
              <h3>Genres</h3>
              <div className="genres">
                {bookEntity.genres
                  ? bookEntity.genres.map((val, i) => (
                      <span key={val.id}>
                        <a>{val.name}</a>
                        {bookEntity.genres && i === bookEntity.genres.length - 1 ? '' : ', '}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className="btn btn-group bookButtons">
            <Button tag={Link} to="/book" replace color="info" data-cy="entityDetailsBackButton">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            {isAdmin ? (
              <Button tag={Link} to={`/book/${bookEntity.id}/edit`} replace color="primary">
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.edit">Edit</Translate>
                </span>
              </Button>
            ) : (
              <Button tag={Link} to={'/user-book-lending/new'} replace color="primary" onClick={() => lendBook()}>
                <FontAwesomeIcon icon="book" /> <span className="d-none d-md-inline">Lend</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
