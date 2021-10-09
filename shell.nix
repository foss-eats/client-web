{ sources ? import ./nix/sources.nix }:
let pkgs = import sources.nixpkgs {};
in with pkgs;
mkShell {
  name = "foss-eats-client-web";
  buildInputs = [
    pkgs.nodejs-16_x
  ];
}
