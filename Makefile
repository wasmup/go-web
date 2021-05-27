.PHONY: all 
all: 
	go build
	sudo cp go-web /usr/sbin/go-web
	ll /usr/sbin/go-web
	sudo chmod 0755 /usr/sbin/go-web
	sudo cp go-web.service /etc/systemd/system/
	sudo systemctl daemon-reload
	sudo systemctl enable go-web.service
	sudo systemctl status go-web.service
	sudo journalctl -u go-web.service
# sudo systemctl start go-web.service
# sudo systemctl restart go-web.service
# sudo systemctl stop go-web.service
# sudo systemctl disable go-web.service