import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ILibraryUser } from 'app/shared/model/library-user.model';
import { getEntities as getLibraryUsers } from 'app/entities/library-user/library-user.reducer';
import { IBook } from 'app/shared/model/book.model';
import { getEntities as getBooks } from 'app/entities/book/book.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-book-lending.reducer';
import { IUserBookLending } from 'app/shared/model/user-book-lending.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { LendingStatus } from 'app/shared/model/enumerations/lending-status.model';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export const UserBookLendingUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
const account = useAppSelector(state => state.authentication.account);
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const libraryUsers = useAppSelector(state => state.libraryUser.entities);
  const books = useAppSelector(state => state.book.entities);
  const userBookLendingEntity = useAppSelector(state => state.userBookLending.entity);
  const loading = useAppSelector(state => state.userBookLending.loading);
  const updating = useAppSelector(state => state.userBookLending.updating);
  const updateSuccess = useAppSelector(state => state.userBookLending.updateSuccess);
  const lendingStatusValues = Object.keys(LendingStatus);
  const handleClose = () => {
    props.history.push('/user-book-lending' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getLibraryUsers({}));
    dispatch(getBooks({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.loantime = convertDateTimeToServer(values.loantime);
    values.returntime = convertDateTimeToServer(values.returntime);

    const entity = {
      ...userBookLendingEntity,
      ...values,
      user: libraryUsers.find(it => it.id.toString() === values.user.toString()),
      book: books.find(it => it.id.toString() === values.book.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          loantime: displayDefaultDateTime(),
          returntime: displayDefaultDateTime(),
          user:!isAdmin?account.login:null
        }
      : {
          status: 'LENDED',
          ...userBookLendingEntity,
          loantime: convertDateTimeFromServer(userBookLendingEntity.loantime),
          returntime: convertDateTimeFromServer(userBookLendingEntity.returntime),
          user: userBookLendingEntity?.user?.id,
          book: userBookLendingEntity?.book?.id,
        };

  return (
    <div>
     { /* eslint-disable no-console */ console.log(defaultValues().user) /* eslint-enable no-console */}
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="librarApp.userBookLending.home.createOrEditLabel" data-cy="UserBookLendingCreateUpdateHeading">
            <Translate contentKey="librarApp.userBookLending.home.createOrEditLabel">Create or edit a UserBookLending</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="user-book-lending-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('librarApp.userBookLending.loantime')}
                id="user-book-lending-loantime"
                name="loantime"
                data-cy="loantime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              {isAdmin && (
                <ValidatedField
                  label={translate('librarApp.userBookLending.returntime')}
                  id="user-book-lending-returntime"
                  name="returntime"
                  data-cy="returntime"
                  type="datetime-local"
                  placeholder="YYYY-MM-DD HH:mm"
                />
              )}
              {isAdmin && (
                <ValidatedField
                  label={translate('librarApp.userBookLending.status')}
                  id="user-book-lending-status"
                  name="status"
                  data-cy="status"
                  type="select"
                >
                  {lendingStatusValues.map(lendingStatus => (
                    <option value={lendingStatus} key={lendingStatus}>
                      {translate('librarApp.LendingStatus.' + lendingStatus)}
                    </option>
                  ))}
                </ValidatedField>
              )}
              <ValidatedField
                label={translate('librarApp.userBookLending.note')}
                id="user-book-lending-note"
                name="note"
                data-cy="note"
                type="text"
                validate={{
                  maxLength: { value: 200, message: translate('entity.validation.maxlength', { max: 200 }) },
                }}
              />
              <ValidatedField
                id="user-book-lending-user"
                name="user"
                data-cy="user"
                label={translate('librarApp.userBookLending.user')}
                type="select"
                required
              >
                <option value="" key="0" />
                {libraryUsers
                  ? libraryUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.fullname}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="user-book-lending-book"
                name="book"
                data-cy="book"
                label={translate('librarApp.userBookLending.book')}
                type="select"
                required
              >
                <option value="" key="0" />
                {books
                  ? books.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.title}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-book-lending" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserBookLendingUpdate;
