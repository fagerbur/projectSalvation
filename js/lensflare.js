!(function (e) {
  function t(r) {
    if (i[r]) 
      return i[r].exports;
    var n = (i[r] = {
      exports: {},
      id: r,
      loaded: !1
    });
    return e[r].call(n.exports, n, n.exports, t),
    (n.loaded = !0),
    n.exports;
  }
  var i = {};
  return (t.m = e),
  (t.c = i),
  (t.p = ""),
  t(0);
})([
  function (e, t, i) {
    if ("undefined" == typeof AFRAME) 
      throw new Error("Component attempted to register before AFRAME was available.");
    if ("undefined" == typeof THREE) 
      throw new Error("Component attempted to register before THREE was available.");
    i(1),
    AFRAME.registerComponent("lensflare", {
      schema: {
        src: {
          type: "asset"
        },
        createLight: {
          type: "boolean",
          default: !0
        },
        position: {
          type: "vec3"
        },
        target: {
          type: "string"
        },
        intensity: {
          type: "number",
          default: 5
        },
        relative: {
          type: "boolean",
          default: !0
        },
        size: {
          type: "number",
          default: 500
        },
        lightColor: {
          type: "string",
          default: "rgb(255, 255, 255)"
        },
        lightDistance: {
          type: "number",
          default: 4
        },
        lightAngle: {
          type: "number",
          default: Math.PI / 3
        },
        lightPenumbra: {
          type: "number",
          default: 0.077
        },
        lightDecay: {
          type: "number",
          default: 1
        },
        lightType: {
          default: "spot",
          oneOf: ["directional", "point", "spot"]
        }
      },
      multiple: !0,
      setLightType: function (e, t) {
        switch (e) {
          case "spot":
            return new THREE.SpotLight(new THREE.Color(t.lightColor), t.intensity, t.lightDistance, t.lightAngle, t.lightPenumbra, t.lightDecay);
          case "point":
            return new THREE.PointLight(new THREE.Color(t.lightColor), t.intensity, t.lightDistance, t.lightDecay);
          case "directional":
            return new THREE.DirectionalLight(new THREE.Color(t.lightColor), t.intensity);
        }
      },
      init: function () {
        let self = this;
        var manager = new THREE.LoadingManager();
          manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
          };
          manager.onLoad = function ( ) {
            console.log( 'Loading complete!');
            if (((self.lensFlare = new THREE.Lensflare()), 
              (self.lensFlareElement = new THREE.LensflareElement(a, self.data.size, 0, new THREE.Color(self.data.lightColor))), 
              self.lensFlare.addElement(self.lensFlareElement), self.lensFlare.position.copy(r), self.data.createLight)) 
              {
                var o = self.setLightType(self.data.lightType.toLowerCase(), self.data),
                  l = !!self.data.target && self.data.target;
                l && ((o.target = document.querySelector(self.data.target).object3D), 
                i.add(o.target), 
                i.updateMatrixWorld()),
                o.position.set(r.x, r.y, r.z),
                self.data.relative ? (o.add(self.lensFlare), t.add(o), i.updateMatrixWorld()) : e.add(o);
              } else 
              {
                self.data.relative ? (t.add(self.lensFlare), i.updateMatrixWorld()) : e.add(self.lensFlare);
              }
            return e;
          };
          manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
          };
        var e = document.querySelector("a-scene").object3D,
          t = this.el.object3D,
          i = this.el.sceneEl.object3D,
          r = this.data.relative ? new THREE.Vector3(0, 0, 0) : this.data.position,
          n = new THREE.TextureLoader(manager),
          a = n.load(this.data.src.src)
        }
      ,
      update: function (e) {},
      remove: function () {},
      pause: function () {},
      play: function () {}
    });
  },
  function (e, t) {
    "use strict";
    (THREE.Lensflare = function () {
      THREE.Mesh.call(this, THREE.Lensflare.Geometry, new THREE.MeshBasicMaterial({
        opacity: 0,
        transparent: !0
      })),
      (this.type = "Lensflare"),
      (this.frustumCulled = !1),
      (this.renderOrder = 1 / 0);
      var e = new THREE.Vector3(),
        t = new THREE.Vector3(),
        i = new THREE.DataTexture(new Uint8Array(768), 16, 16, THREE.RGBFormat);
      (i.minFilter = THREE.NearestFilter),
      (i.magFilter = THREE.NearestFilter),
      (i.wrapS = THREE.ClampToEdgeWrapping),
      (i.wrapT = THREE.ClampToEdgeWrapping),
      (i.needsUpdate = !0);
      var r = new THREE.DataTexture(new Uint8Array(768), 16, 16, THREE.RGBFormat);
      (r.minFilter = THREE.NearestFilter),
      (r.magFilter = THREE.NearestFilter),
      (r.wrapS = THREE.ClampToEdgeWrapping),
      (r.wrapT = THREE.ClampToEdgeWrapping),
      (r.needsUpdate = !0);
      var n = THREE.Lensflare.Geometry,
        a = new THREE.RawShaderMaterial({
          uniforms: {
            scale: {
              value: null
            },
            screenPosition: {
              value: null
            }
          },
          vertexShader: [
            "precision highp float;",
            "uniform vec3 screenPosition;",
            "uniform vec2 scale;",
            "attribute vec3 position;",
            "void main() {",
            "\tgl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );",
            "}"
          ].join("\n"),
          fragmentShader: ["precision highp float;", "void main() {", "\tgl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );", "}"].join("\n"),
          depthTest: !0,
          depthWrite: !1,
          transparent: !1
        }),
        o = new THREE.RawShaderMaterial({
          uniforms: {
            map: {
              value: i
            },
            scale: {
              value: null
            },
            screenPosition: {
              value: null
            }
          },
          vertexShader: [
            "precision highp float;",
            "uniform vec3 screenPosition;",
            "uniform vec2 scale;",
            "attribute vec3 position;",
            "attribute vec2 uv;",
            "varying vec2 vUV;",
            "void main() {",
            "\tvUV = uv;",
            "\tgl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );",
            "}"
          ].join("\n"),
          fragmentShader: [
            "precision highp float;",
            "uniform sampler2D map;",
            "varying vec2 vUV;",
            "void main() {",
            "\tgl_FragColor = texture2D( map, vUV );",
            "}"
          ].join("\n"),
          depthTest: !1,
          depthWrite: !1,
          transparent: !1
        }),
        l = new THREE.Mesh(n, a),
        s = [],
        c = THREE.LensflareElement.Shader,
        u = new THREE.RawShaderMaterial({
          uniforms: {
            map: {
              value: null
            },
            occlusionMap: {
              value: r
            },
            color: {
              value: new THREE.Color(16777215)
            },
            scale: {
              value: new THREE.Vector2()
            },
            screenPosition: {
              value: new THREE.Vector3()
            }
          },
          vertexShader: c.vertexShader,
          fragmentShader: c.fragmentShader,
          blending: THREE.AdditiveBlending,
          transparent: !0,
          depthWrite: !1
        }),
        p = new THREE.Mesh(n, u);
      this.addElement = function (e) {
        s.push(e);
      };
      var E = new THREE.Vector2(),
        v = new THREE.Vector2(),
        d = new THREE.Box2(),
        f = new THREE.Vector4();
      (this.onBeforeRender = function (c, h, m) {
        c.getCurrentViewport(f);
        var y = f.w / f.z,
          g = f.z / 2,
          T = f.w / 2,
          R = 16 / f.w;
        if ((E.set(R * y, R), d.min.set(f.x, f.y), d.max.set(f.x + (f.z - 16), f.y + (f.w - 16)), t.setFromMatrixPosition(this.matrixWorld), t.applyMatrix4(m.matrixWorldInverse), !(t.z > 0) && (e.copy(t).applyMatrix4(m.projectionMatrix), (v.x = f.x + e.x * g + g - 8), (v.y = f.y + e.y * T + T - 8), d.containsPoint(v)))) {
          c.copyFramebufferToTexture(v, i);
          var x = a.uniforms;
          (x.scale.value = E),
          (x.screenPosition.value = e),
          c.renderBufferDirect(m, null, n, a, l, null),
          c.copyFramebufferToTexture(v, r);
          var x = o.uniforms;
          (x.scale.value = E),
          (x.screenPosition.value = e),
          c.renderBufferDirect(m, null, n, o, l, null);
          for (var w = 2 * -e.x, H = 2 * -e.y, b = 0, M = s.length; b < M; b++) {
            var D = s[b],
              x = u.uniforms;
            x.color.value.copy(D.color),
            (x.map.value = D.texture),
            (x.screenPosition.value.x = e.x + w * D.distance),
            (x.screenPosition.value.y = e.y + H * D.distance);
            var R = D.size / f.w,
              y = f.w / f.z;
            x.scale.value.set(R * y, R),
            (u.uniformsNeedUpdate = !0),
            c.renderBufferDirect(m, null, n, u, p, null);
          }
        }
      }),
      (this.dispose = function () {
        a.dispose(),
        o.dispose(),
        u.dispose(),
        i.dispose(),
        r.dispose();
        for (var e = 0, t = s.length; e < t; e++) 
          s[e].texture.dispose();
        }
      );
    }),
    (THREE.Lensflare.prototype = Object.create(THREE.Mesh.prototype)),
    (THREE.Lensflare.prototype.constructor = THREE.Lensflare),
    (THREE.Lensflare.prototype.isLensflare = !0),
    (THREE.LensflareElement = function (e, t, i, r) {
      (this.texture = e),
      (this.size = t || 1),
      (this.distance = i || 0),
      (this.color = r || new THREE.Color(16777215));
    }),
    (THREE.LensflareElement.Shader = {
      uniforms: {
        map: {
          value: null
        },
        occlusionMap: {
          value: null
        },
        color: {
          value: null
        },
        scale: {
          value: null
        },
        screenPosition: {
          value: null
        }
      },
      vertexShader: [
        "precision highp float;",
        "uniform vec3 screenPosition;",
        "uniform vec2 scale;",
        "uniform sampler2D occlusionMap;",
        "attribute vec3 position;",
        "attribute vec2 uv;",
        "varying vec2 vUV;",
        "varying float vVisibility;",
        "void main() {",
        "\tvUV = uv;",
        "\tvec2 pos = position.xy;",
        "\tvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );",
        "\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );",
        "\tvVisibility =        visibility.r / 9.0;",
        "\tvVisibility *= 1.0 - visibility.g / 9.0;",
        "\tvVisibility *=       visibility.b / 9.0;",
        "\tgl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );",
        "}"
      ].join("\n"),
      fragmentShader: [
        "precision highp float;",
        "uniform sampler2D map;",
        "uniform vec3 color;",
        "varying vec2 vUV;",
        "varying float vVisibility;",
        "void main() {",
        "\tvec4 texture = texture2D( map, vUV );",
        "\ttexture.a *= vVisibility;",
        "\tgl_FragColor = texture;",
        "\tgl_FragColor.rgb *= color;",
        "}"
      ].join("\n")
    }),
    (THREE.Lensflare.Geometry = (function () {
      var e = new THREE.BufferGeometry(),
        t = new Float32Array([
          -1,
          -1,
          0,
          0,
          0,
          1,
          -1,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          1,
          -1,
          1,
          0,
          0,
          1
        ]),
        i = new THREE.InterleavedBuffer(t, 5);
      return (e.setIndex([
        0,
        1,
        2,
        0,
        2,
        3
      ]), e.addAttribute("position", new THREE.InterleavedBufferAttribute(i, 3, 0, !1)), e.addAttribute("uv", new THREE.InterleavedBufferAttribute(i, 2, 3, !1)), e);
    })());
  }
]);