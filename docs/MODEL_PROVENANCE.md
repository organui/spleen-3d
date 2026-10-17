# Model provenance and preparation

## Exact source and terms

The runtime model is a curated subset of **BodyParts3D 3.0** (release 20110915, `BodyParts3D_3.0_obj_95`). The meshes were taken on **2026-10-16** from the binary STL conversions published in [Kevin-Mattheus-Moerman/BodyParts3D](https://github.com/Kevin-Mattheus-Moerman/BodyParts3D), which converted the official OBJ release to STL without changing geometry and names each file by its FMA concept.

That copy states the data license as **Creative Commons Attribution-Share Alike 2.1 Japan**, the license BodyParts3D originally carried. A snapshot of its license text is preserved in [model-source/mirror-LICENSE_content.txt](model-source/mirror-LICENSE_content.txt) (SHA-256 `0e26340c8fadac4a0478d23dd12f4cb20b4043c436d0ab95eacb062391a7ec84`). Required credit:

> BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan.

`public/models/spleen.glb` is an adaptation of that data and is distributed under the same CC BY-SA 2.1 Japan license. The MIT code license does not cover the model or its screenshots.

### Why this differs from the other explorers

The heart, brain, liver and kidney explorers use BodyParts3D 4.0 downloaded directly from the [official DBCLS archive](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html), whose current license page grants CC BY 4.0. The lungs explorer, like this one, uses a GitHub copy and CC BY-SA 2.1 Japan. The environment this explorer was built in could not reach that archive, so it uses the GitHub copy above instead. Following the heart explorer's rule of relying on the terms attached to the copy actually downloaded, this explorer uses the share-alike license. Re-preparing the same concepts from the official 4.0 archive would let the model move to CC BY 4.0 like the heart explorer; that would be a model change to review, not a relabelling.

Authoritative sources:

- [Official archive download page](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html) and [license page](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html)
- [STL copy used](https://github.com/Kevin-Mattheus-Moerman/BodyParts3D)
- Mitsuhashi et al. (2009), [doi:10.1093/nar/gkn613](https://doi.org/10.1093/nar/gkn613)

## What the source contains

| Display structure        | Group               | Source concept | Source label (parts list) | Triangles |
| ------------------------ | ------------------- | -------------- | ------------------------- | --------- |
| Spleen                   | Spleen              | FMA7196        | spleen                    | 9,016     |
| Splenic artery           | Splenic vessels     | FMA14773       | splenic artery            | 3,326     |
| Splenic vein             | Splenic vessels     | FMA14331       | splenic vein              | 1,352     |
| Celiac trunk             | Splenic vessels     | FMA50737       | celiac artery             | 454       |
| Superior mesenteric vein | Splenic vessels     | FMA14332       | superior mesenteric vein  | 202       |
| Stomach                  | Neighbouring organs | FMA7148        | stomach                   | 9,384     |
| Pancreas                 | Neighbouring organs | FMA7198nsn     | pancreas, nsn             | 11,414    |
| Left kidney              | Neighbouring organs | FMA7205        | left kidney               | 15,358    |
| Left adrenal gland       | Neighbouring organs | FMA15630       | left adrenal gland        | 19,788    |

Each structure is one source file. The rows of the source parts list are preserved in [selected-parts.tsv](model-source/selected-parts.tsv). The STL copy has no `FMA7198.stl`; `FMA7198nsn.stl` is the pancreas body, and the pancreatic duct (`FMA10419`) is a separate file that is not included. The preparation script refuses to run if a structure's source label in the parts list differs from the one in `src/anatomy.ts`.

The spleen is a single closed surface. Its hilum, poles, borders, capsule, red and white pulp, and its ligaments are not separate structures. The superior mesenteric vein is only a short segment near its junction with the splenic vein. The portal vein, aorta, diaphragm, left colic flexure and ribs are omitted. The neighbouring organs are included for orientation. The model is an adult male reference, not a patient-specific or universal anatomy.

## Reproduce the runtime asset

The 1.7 MB `public/models/spleen.glb` is included in the checkout. Ordinary setup does not download any source files. To regenerate it:

```sh
bun install --frozen-lockfile
bun run prepare:model
bun run verify:model
```

The script downloads the pinned files in [model-inputs.json](../scripts/model-inputs.json) into the ignored `.asset-cache/` only when they are absent, and checks every SHA-256 **before** conversion. The URLs follow the copy's `main` branch, so they are pinned by content: if upstream changes a file, preparation stops until the new data and its license are reviewed.

Steps:

1. Read the parts list and check each structure's source label.
2. Read each binary STL, check its size against its triangle count, and weld vertices that share an exact position so the mesh is indexed. No triangles are added or removed.
3. Center the whole selection on its source bounding box; transform `(x,y,z)` to `(x,z,-y)` and multiply by `0.02`. This is a display scale, not a measurement calibration. The exact center and bounds are in the manifest.
4. Recompute vertex normals and assign illustrative colors.
5. Store the stable structure ID and FMA ID on each GLB node, export GLB, and write the input/output manifest.

`bun run verify:model` decodes the runtime, verifies its checksum, checks every structure/FMA pair, ensures geometry is finite and indices are valid, and reports the geometry counts.

## Anatomy text and review

Descriptions are original concise summaries of the US National Cancer Institute's [SEER Training spleen page](https://training.seer.cancer.gov/anatomy/lymphatic/components/spleen.html) and standard anatomical relations of the spleen, written on 2026-10-16. No third-party text or illustrations are redistributed.

Completed: source label checks, geometry inspection in the browser, and interface checks. **Not completed: review by a clinical anatomy expert.** The app, README and model dialog say so. This is an educational interface demonstration, not a diagnostic, treatment or measurement tool.
