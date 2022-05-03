import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './book.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const BookDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const bookEntity = useAppSelector(state => state.book.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookDetailsHeading">
          <Translate contentKey="librarApp.book.detail.title">Book</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bookEntity.id}</dd>
          <dt>
            <span id="isbn">
              <Translate contentKey="librarApp.book.isbn">Isbn</Translate>
            </span>
          </dt>
          <dd>{bookEntity.isbn}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="librarApp.book.title">Title</Translate>
            </span>
          </dt>
          <dd>{bookEntity.title}</dd>
          <dt>
            <span id="year">
              <Translate contentKey="librarApp.book.year">Year</Translate>
            </span>
          </dt>
          <dd>{bookEntity.year}</dd>
          <dt>
            <span id="note">
              <Translate contentKey="librarApp.book.note">Note</Translate>
            </span>
          </dt>
          <dd>{bookEntity.note}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="librarApp.book.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {bookEntity.image ? (
              <div>
                {bookEntity.imageContentType ? (
                  <a onClick={openFile(bookEntity.imageContentType, bookEntity.image)}>
                    <img src={`data:${bookEntity.imageContentType};base64,${bookEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {bookEntity.imageContentType}, {byteSize(bookEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="librarApp.book.genres">Genres</Translate>
          </dt>
          <dd>
            {bookEntity.genres
              ? bookEntity.genres.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.name}</a>
                    {bookEntity.genres && i === bookEntity.genres.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="librarApp.book.author">Author</Translate>
          </dt>
          <dd>{bookEntity.author ? bookEntity.author.fullname : ''}</dd>
        </dl>
        <Button tag={Link} to="/book" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book/${bookEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookDetail;
