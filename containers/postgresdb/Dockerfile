FROM postgres:10-alpine

RUN apk add --update --no-cache tzdata \
&& rm -fr /var/cache/apk/* \
&& mkdir ~/.ssh

ENV TZ America/Sao_Paulo

# COPY /sql/ /docker-entrypoint-initdb.d

EXPOSE 5432

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "postgres" ]
