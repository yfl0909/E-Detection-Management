<template>
  <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map" />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 1440
    },
    height: {
      type: Number,
      default: 900
    },
    point: {
      type: Array,
      default() {
        return [119.306776, 26.081305];
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: "479b4390a3479dba1018eb8ecea26c4b",
      capitals: [
        {
          center: [119.306776, 26.081305],
          status: "#0000ff"
        },
        {
          center: [119.243823, 26.089093],
          status: "#0000ff"
        },
        {
          center: [119.29729, 26.068584],
          status: "#ff0000"
        },
        {
          center: [119.322299, 26.03197],
          status: "#0000ff"
        },
        {
          center: [119.178713, 26.072641],
          status: "#ff0000"
        },
        {
          center: [119.396175, 25.992746],
          status: "#0000ff"
        },
        {
          center: [119.326323, 26.120239],
          status: "#ff0000"
        }
      ]
    };
  },
  watch: {
    point(val, old) {
      this.map.setCenter(val);
      this.marker.setPosition(val);
    }
  },
  mounted() {
    const self = this;
    self.id = `map${Math.random()
      .toString()
      .slice(4, 6)}`;

    window.onmaploaded = () => {
      const map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point,
        mapStyle: "amap://styles/grey"
      });

      var circle = new AMap.Circle({
        center: [119.306776, 26.081305],
        radius: 15000, //半径
        borderWeight: 3,
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: "dashed",
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: "#1791fc",
        zIndex: 50
      });
      map.add(circle);

      for (var i = 0; i < this.capitals.length; i += 1) {
        var center = this.capitals[i].center;
          var circleMarker = new AMap.CircleMarker({
            center: center,
            radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
            strokeColor: "white",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: this.capitals[i].status,
            fillOpacity: 0.5,
            zIndex: 10,
            bubble: true,
            cursor: "pointer",
            clickable: true
          });

        circleMarker.setMap(map);
      }

      self.map = map;
      window.AMap.plugin("AMap.ToolBar", () => {
        const toolbar = new window.AMap.ToolBar();
        map.addControl(toolbar);
        const marker = new window.AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: self.point
        });
        self.marker = marker;
        marker.setMap(map);
      });
    };

    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`;
    const jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
