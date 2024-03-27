For learning and gaining experience with Kubernetes, Agones, and Open Match.

Experimenting and semi-following this YouTube tutorial:

- [Google OSS Hands on Workshop - Agones & Open Match](https://www.youtube.com/watch?v=-UtDsESpBlo)

## Notes

My Kubernetes cluster is hosted on `x86` servers while development is done on my
`arm` MacBook Pro, so I use the `--platform` flag when building container images:

```shell
docker buildx build --platform linux/amd64 -t jorahty/space-agon:0.1 . --push
```
