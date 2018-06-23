export default function isError(response) {
    if (response.status > 100 && response.status <= 400)
        return response.json();
    else if (response.status === 404) {
        throw new Error('404: NOT FOUND');
    }
    else if (response.status > 400 && response.status < 500) {
        throw new Error(response.status.toString() + ': SOME CLIENT ERROR');
    }
    else if (response.status > 500 && response.status < 600) {
        throw new Error(response.status.toString() + ': SOME SERVER ERROR');
    }
    else {
        throw new Error(response.status.toString() + ': UNEXPECTED STATE');
    }
}
