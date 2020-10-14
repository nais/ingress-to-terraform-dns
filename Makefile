DATE=$(shell date "+%Y-%m-%d")
LAST_COMMIT=$(shell git --no-pager log -1 --pretty=%h)
VERSION="$(DATE)-$(LAST_COMMIT)"
IMAGE="navikt/ingress-to-terraform-dns:$(VERSION)"

docker:
	docker image build -t $(IMAGE) . 

