import secrets
import string
from datetime import datetime, timedelta

invitation_codes = {}

def remove_expired_code():
	time = datetime.now()
	invitation_list = list(invitation_codes.keys())

	for i in range(len(invitation_list)):
		key = invitation_list[i]
		if time >= invitation_codes[key]['expires_at']:
			del invitation_codes[key]

def generate_code(request):
	alphabet = string.ascii_letters + (string.digits * 3)

	str = ''.join(secrets.choice(alphabet) for i in range(10))

	code = request.body.decode('utf8') + '_' + str

	invitation_codes[code] = {
        'content': request.body,
        'created_at': datetime.now(),
        'expires_at': datetime.now() + timedelta(minutes=10)
    }
	remove_expired_code()
	return code
