import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './library-user.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LibraryUserDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const libraryUserEntity = useAppSelector(state => state.libraryUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="libraryUserDetailsHeading">
          <Translate contentKey="librarApp.libraryUser.detail.title">LibraryUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{libraryUserEntity.id}</dd>
          <dt>
            <span id="fullname">
              <Translate contentKey="librarApp.libraryUser.fullname">Fullname</Translate>
            </span>
          </dt>
          <dd>{libraryUserEntity.fullname}</dd>
          <dt>
            <span id="birthdate">
              <Translate contentKey="librarApp.libraryUser.birthdate">Birthdate</Translate>
            </span>
          </dt>
          <dd>
            {libraryUserEntity.birthdate ? (
              <TextFormat value={libraryUserEntity.birthdate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="memeberdate">
              <Translate contentKey="librarApp.libraryUser.memeberdate">Memeberdate</Translate>
            </span>
          </dt>
          <dd>
            {libraryUserEntity.memeberdate ? (
              <TextFormat value={libraryUserEntity.memeberdate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="email">
              <Translate contentKey="librarApp.libraryUser.email">Email</Translate>
            </span>
          </dt>
          <dd>{libraryUserEntity.email}</dd>
          <dt>
            <span id="mobile">
              <Translate contentKey="librarApp.libraryUser.mobile">Mobile</Translate>
            </span>
          </dt>
          <dd>{libraryUserEntity.mobile}</dd>
          <dt>
            <span id="adress">
              <Translate contentKey="librarApp.libraryUser.adress">Adress</Translate>
            </span>
          </dt>
          <dd>{libraryUserEntity.adress}</dd>
          <dt>
            <span id="note">
              <Translate contentKey="librarApp.libraryUser.note">Note</Translate>
            </span>
          </dt>
          <dd>{libraryUserEntity.note}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="librarApp.libraryUser.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {libraryUserEntity.image ? (
              <div>
                {libraryUserEntity.imageContentType ? (
                  <a onClick={openFile(libraryUserEntity.imageContentType, libraryUserEntity.image)}>
                    <img
                      src={`data:${libraryUserEntity.imageContentType};base64,${libraryUserEntity.image}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {libraryUserEntity.imageContentType}, {byteSize(libraryUserEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="librarApp.libraryUser.user">User</Translate>
          </dt>
          <dd>{libraryUserEntity.user ? libraryUserEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/library-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/library-user/${libraryUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LibraryUserDetail;
