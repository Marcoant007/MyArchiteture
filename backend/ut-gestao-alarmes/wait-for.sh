#!/bin/sh
   
# original script: https://github.com/eficode/wait-for/blob/master/wait-for

set -- "$@" -- "$TIMEOUT" "$QUIET" "$HOST" "$PORT" "$result"
TIMEOUT=15
QUIET=0

echoerr() {
  if [ "$QUIET" -ne 1 ]; then printf "%s\n" "$*" 1>&2; fi
}

usage() {
  exitcode="$1"
  cat << USAGE >&2
Usage:
  $cmdname host:port [-t timeout] [-- command args]
  -q | --quiet                        Do not output any status messages
  -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
  -- COMMAND ARGS                     Execute command with args after the test finishes
USAGE
  exit "$exitcode"
}

wait_for() {
 if ! command -v nc >/dev/null; then
    echoerr 'nc command is missing!'
    exit 1
  fi

  while :; do
    nc -z "$HOST" "$PORT" > /dev/null 2>&1
    
    result=$?
    if [ $result -eq 0 ] ; then
      if [ $# -gt 6 ] ; then
        for result in $(seq $(($# - 6))); do
          result=$1
          shift
          set -- "$@" "$result"
        done

        TIMEOUT=$2 QUIET=$3 HOST=$4 PORT=$5 result=$6
        shift 6
        exec "$@"
      fi
      exit 0
    fi

    if [ "$TIMEOUT" -le 0 ]; then
      break
    fi
    TIMEOUT=$((TIMEOUT - 1))

    sleep 1
  done
  echo "Operation timed out" >&2
  exit 1
}

while :; do
  case "$1" in
    *:* )
    HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
    PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
    shift 1
    ;;
    -q | --quiet)
    QUIET=1
    shift 1
    ;;
    -q-*)
    QUIET=0
    echoerr "Unknown option: $1"
    usage 1
    ;;
    -q*)
    QUIET=1
    result=$1
    shift 1
    set -- -"${result#-q}" "$@"
    ;;
    -t | --timeout)
    TIMEOUT="$2"
    shift 2
    ;;
    -t*)
    TIMEOUT="${1#-t}"
    shift 1
    ;;
    --timeout=*)
    TIMEOUT="${1#*=}"
    shift 1
    ;;
    --)
    shift
    break
    ;;
    --help)
    usage 0
    ;;
    -*)
    QUIET=0
    echoerr "Unknown option: $1"
    usage 1
    ;;
    *)
    QUIET=0
    echoerr "Unknown argument: $1"
    usage 1
    ;;
  esac
done

if ! [ "$TIMEOUT" -ge 0 ] 2>/dev/null; then
  echoerr "Error: invalid timeout '$TIMEOUT'"
  usage 3
fi

if [ "$HOST" = "" -o "$PORT" = "" ]; then
  echoerr "Error: you need to provide a host and port to test."
  usage 2
fi

wait_for "$@"
