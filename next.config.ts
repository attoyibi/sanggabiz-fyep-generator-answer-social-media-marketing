import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * pptxgenjs dipakai untuk menyusun deck capstone langsung di peramban.
   * Paketnya juga bisa berjalan di Node, jadi berkasnya mengimpor modul bawaan
   * Node seperti "node:fs" untuk jalur itu. Di peramban jalur tersebut tidak
   * pernah dipakai, tetapi webpack tetap mencoba menelusurinya dan berhenti
   * karena skema "node:" bukan sesuatu yang bisa ia bundel.
   *
   * Awalan "node:" dibuang lebih dulu supaya namanya kembali menjadi "fs" dan
   * "https" biasa, lalu keduanya dipetakan ke false — sama seperti yang sudah
   * dinyatakan pptxgenjs sendiri lewat field "browser" pada package.json-nya.
   */
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, "");
        })
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        https: false,
        http: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
