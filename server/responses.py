'''
This module defines the response classes and types for the server.

- ResponseSuccess: Represents a successful response.
- ResponseFailure: Represents a failed response.
- ResponseTypes: Enumerates possible response types/errors.
'''
class ResponseTypes:
    '''
    ResponseTypes: Enumerates possible response types/errors.
    '''
    SYSTEM_ERROR = "SystemError"
    NOT_FOUND = "NotFound"
    AUTHORIZATION_ERROR = "AuthorizationError"
    PARAMETER_ERROR = "ParameterError"
    SUCCESS = "Success"
    CONFLICT = "Conflict"


class ResponseFailure:
    '''
    Represents a failed response, encapsulating a type of error
    and an associated message.
    '''
    def __init__(self, response_type, message):
        self.response_type = response_type
        self.message = self._format_message(message)

    def _format_message(self, msg):
        if isinstance(msg, Exception):
            return f"{msg.__class__.__name__}: {msg}"
        return msg

    @property
    def value(self):
        '''
        Returns the response as a dictionary containing the type and message.
        '''
        return {"type": self.response_type, "message": self.message}

    def __bool__(self):
        '''
        Determines the truthiness of the response (always False).
        '''
        return False


class ResponseSuccess:
    '''
    Represents a successful response.
    '''
    def __init__(self, value=None):
        '''
        Initializes a ResponseSuccess instance.
        '''
        self.value = value
        self.response_type = ResponseTypes.SUCCESS

    def __bool__(self):
        '''
        Determines the truthiness of the response (always True).
        '''
        return True


def build_response_from_invalid_request(invalid_request):
    '''
    Builds a ResponseFailure from an invalid request, compiling its errors.
    '''
    message = "\n".join(
        [f"{err['parameter']}: {err['message']}"
         for err in invalid_request.errors]
    )
    return ResponseFailure(ResponseTypes.PARAMETER_ERROR, message)
