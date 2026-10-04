// Deterministic data only; scientific acceptance remains agent-owned.
const fixtures = {
  "grafico": {
    "agentId": "grafico",
    "discovery": {
      "contractVersion": 1,
      "viewerState": "personal-transient",
      "submission": "explicit",
      "capabilities": {
        "elagente.viewer.select": true,
        "elagente.viewer.capture": true,
        "elagente.viewer.style": true,
        "elagente.viewer.program": false,
        "elagente.conversation.export": true,
        "elagente.conversation.share-read": true,
        "elagente.conversation.share-write": false,
        "elagente.conversation.fork": false
      },
      "contributions": [
        {
          "id": "grafico.science",
          "type": "grafico.science",
          "version": 1,
          "minContractVersion": 1,
          "rendererIds": [
            "elagente.structure.xyz"
          ],
          "panelIds": [
            "grafico.workflow"
          ],
          "actionIds": [
            "elagente.viewer.select",
            "elagente.viewer.capture",
            "elagente.viewer.style"
          ],
          "optionIds": [
            "science.precision"
          ]
        }
      ],
      "options": [
        {
          "id": "science.precision",
          "label": "Precision",
          "scope": "thread",
          "apply": "nextTurn",
          "mutable": true,
          "schema": {
            "type": "string",
            "enum": [
              "standard",
              "high"
            ]
          },
          "default": "standard"
        }
      ],
      "actions": [
        {
          "id": "elagente.viewer.select",
          "label": "Submit selection",
          "execution": "native",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 10000
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 10000
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.capture",
          "label": "Capture PNG",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "imageArtifactId": {
                "type": "string",
                "maxLength": 160
              },
              "mediaType": {
                "type": "string",
                "enum": [
                  "image/png"
                ]
              },
              "width": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              },
              "height": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              }
            },
            "required": [
              "imageArtifactId",
              "mediaType",
              "width",
              "height"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.style",
          "label": "Change representation",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "style": {
                "type": "string",
                "enum": [
                  "ball-stick",
                  "stick",
                  "spacefill"
                ]
              }
            },
            "required": [
              "style"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          }
        }
      ]
    },
    "artifacts": [
      {
        "id": "artifact-grafico-0",
        "version": 1,
        "path": ".artifacts/e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2.xyz",
        "name": "grafico-0.xyz",
        "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
        "size": 53,
        "mediaType": "chemical/x-xyz",
        "kind": "chem.structure",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "format": "xyz",
          "stream": {
            "id": "grafico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          },
          "atoms": [
            {
              "id": "O1",
              "element": "O"
            },
            {
              "id": "H1",
              "element": "H"
            },
            {
              "id": "H2",
              "element": "H"
            }
          ],
          "bonds": [
            {
              "atomIds": [
                "O1",
                "H1"
              ],
              "order": 1
            },
            {
              "atomIds": [
                "O1",
                "H2"
              ],
              "order": 1
            }
          ],
          "cell": {
            "vectors": [
              [
                12,
                0,
                0
              ],
              [
                0,
                12,
                0
              ],
              [
                0,
                0,
                12
              ]
            ],
            "periodic": [
              false,
              false,
              false
            ],
            "unit": "angstrom"
          },
          "render": {
            "coordinateUnit": "angstrom",
            "bonding": "provided",
            "style": "ball-stick"
          }
        },
        "fixtureBytes": "3\nwater frame 0\nO 0 0 0\nH 0.76 0.58 0\nH -0.76 0.58 0\n"
      },
      {
        "id": "artifact-grafico-1",
        "version": 1,
        "path": ".artifacts/fda6088d45ee86c47f58a51fce2c4a61597e0f19b1017a9014bec6c46616a4f6.xyz",
        "name": "grafico-1.xyz",
        "checksum": "fda6088d45ee86c47f58a51fce2c4a61597e0f19b1017a9014bec6c46616a4f6",
        "size": 53,
        "mediaType": "chemical/x-xyz",
        "kind": "chem.structure",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-1",
          "checksum": "fda6088d45ee86c47f58a51fce2c4a61597e0f19b1017a9014bec6c46616a4f6",
          "format": "xyz",
          "stream": {
            "id": "grafico-stream-1",
            "frameId": "frame-1",
            "frameIndex": 1
          },
          "atoms": [
            {
              "id": "O1",
              "element": "O"
            },
            {
              "id": "H1",
              "element": "H"
            },
            {
              "id": "H2",
              "element": "H"
            }
          ],
          "bonds": [
            {
              "atomIds": [
                "O1",
                "H1"
              ],
              "order": 1
            },
            {
              "atomIds": [
                "O1",
                "H2"
              ],
              "order": 1
            }
          ],
          "cell": {
            "vectors": [
              [
                12,
                0,
                0
              ],
              [
                0,
                12,
                0
              ],
              [
                0,
                0,
                12
              ]
            ],
            "periodic": [
              false,
              false,
              false
            ],
            "unit": "angstrom"
          },
          "render": {
            "coordinateUnit": "angstrom",
            "bonding": "provided",
            "style": "ball-stick"
          }
        },
        "fixtureBytes": "3\nwater frame 1\nO 0 0 0\nH 0.75 0.59 0\nH -0.75 0.59 0\n"
      }
    ],
    "input": {
      "version": 1,
      "requestId": "grafico-request-1",
      "operationId": "grafico-operation-1",
      "actionId": "elagente.viewer.select",
      "target": {
        "artifactId": "artifact-grafico-0",
        "objectId": "urn:grafico:water:1",
        "sourceRevision": "native-revision-0",
        "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
        "streamId": "grafico-stream-1",
        "frameId": "frame-0",
        "frameIndex": 0
      },
      "payload": {
        "selectedIds": [
          "O1",
          "H1"
        ]
      },
      "kind": "selection",
      "submission": "explicit"
    },
    "acknowledgements": [
      {
        "version": 1,
        "requestId": "grafico-request-1",
        "operationId": "grafico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-grafico-0",
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "streamId": "grafico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "accepted"
      },
      {
        "version": 1,
        "requestId": "grafico-request-1",
        "operationId": "grafico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-grafico-0",
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "streamId": "grafico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "applied",
        "result": {
          "selectedIds": [
            "O1",
            "H1"
          ]
        }
      }
    ],
    "progress": {
      "version": 1,
      "callId": "tool-fixture-1",
      "label": "Scientific calculation",
      "status": "completed",
      "arguments": {
        "precision": "standard"
      },
      "startedAt": "2026-10-04T00:00:00.000Z",
      "completedAt": "2026-10-04T00:00:01.000Z",
      "resultSummary": "Two immutable frames",
      "logSummary": "Task complete",
      "artifactIds": [
        "artifact-grafico-0",
        "artifact-grafico-1"
      ],
      "completed": 2,
      "total": 2,
      "unit": "frames"
    },
    "usage": {
      "version": 1,
      "scope": "turn",
      "scopeId": "turn-fixture-1",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "available",
      "tokens": {
        "input": 20,
        "output": 10,
        "cacheRead": 5
      }
    },
    "unavailableUsage": {
      "version": 1,
      "scope": "room",
      "scopeId": "thr-fixture",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "unavailable"
    },
    "unknownItem": {
      "id": "unknown-fixture",
      "kind": "science.unknown",
      "text": "Scientific data available for download",
      "artifact": {
        "id": "artifact-grafico-0",
        "version": 1,
        "path": ".artifacts/e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2.xyz",
        "name": "grafico-0.xyz",
        "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
        "size": 53,
        "mediaType": "chemical/x-xyz",
        "kind": "chem.structure",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "format": "xyz",
          "stream": {
            "id": "grafico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          },
          "atoms": [
            {
              "id": "O1",
              "element": "O"
            },
            {
              "id": "H1",
              "element": "H"
            },
            {
              "id": "H2",
              "element": "H"
            }
          ],
          "bonds": [
            {
              "atomIds": [
                "O1",
                "H1"
              ],
              "order": 1
            },
            {
              "atomIds": [
                "O1",
                "H2"
              ],
              "order": 1
            }
          ],
          "cell": {
            "vectors": [
              [
                12,
                0,
                0
              ],
              [
                0,
                12,
                0
              ],
              [
                0,
                0,
                12
              ]
            ],
            "periodic": [
              false,
              false,
              false
            ],
            "unit": "angstrom"
          },
          "render": {
            "coordinateUnit": "angstrom",
            "bonding": "provided",
            "style": "ball-stick"
          }
        },
        "fixtureBytes": "3\nwater frame 0\nO 0 0 0\nH 0.76 0.58 0\nH -0.76 0.58 0\n"
      },
      "extension": {
        "version": 1,
        "type": "second-agent.unrecognized",
        "data": {
          "summary": "Preserve metadata; no executable renderer"
        }
      }
    }
  },
  "cuantico": {
    "agentId": "cuantico",
    "discovery": {
      "contractVersion": 1,
      "viewerState": "personal-transient",
      "submission": "explicit",
      "capabilities": {
        "elagente.viewer.select": true,
        "elagente.viewer.capture": true,
        "elagente.viewer.style": true,
        "elagente.viewer.program": false,
        "elagente.conversation.export": true,
        "elagente.conversation.share-read": true,
        "elagente.conversation.share-write": false,
        "elagente.conversation.fork": false
      },
      "contributions": [
        {
          "id": "cuantico.science",
          "type": "cuantico.science",
          "version": 1,
          "minContractVersion": 1,
          "rendererIds": [
            "cuantico.spectrum"
          ],
          "panelIds": [
            "cuantico.workflow"
          ],
          "actionIds": [
            "elagente.viewer.select",
            "elagente.viewer.capture",
            "elagente.viewer.style"
          ],
          "optionIds": [
            "science.precision"
          ]
        }
      ],
      "options": [
        {
          "id": "science.precision",
          "label": "Precision",
          "scope": "thread",
          "apply": "nextTurn",
          "mutable": true,
          "schema": {
            "type": "string",
            "enum": [
              "standard",
              "high"
            ]
          },
          "default": "standard"
        }
      ],
      "actions": [
        {
          "id": "elagente.viewer.select",
          "label": "Submit selection",
          "execution": "native",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 10000
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 10000
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.capture",
          "label": "Capture PNG",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "imageArtifactId": {
                "type": "string",
                "maxLength": 160
              },
              "mediaType": {
                "type": "string",
                "enum": [
                  "image/png"
                ]
              },
              "width": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              },
              "height": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              }
            },
            "required": [
              "imageArtifactId",
              "mediaType",
              "width",
              "height"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.style",
          "label": "Change representation",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "style": {
                "type": "string",
                "enum": [
                  "ball-stick",
                  "stick",
                  "spacefill"
                ]
              }
            },
            "required": [
              "style"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          }
        }
      ]
    },
    "artifacts": [
      {
        "id": "artifact-cuantico-0",
        "version": 1,
        "path": ".artifacts/971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d.csv",
        "name": "cuantico-0.csv",
        "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
        "size": 36,
        "mediaType": "text/csv",
        "kind": "science.spectrum",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "format": "csv",
          "stream": {
            "id": "cuantico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          }
        },
        "fixtureBytes": "frequency,intensity\n100,0.5\n200,1.0\n"
      },
      {
        "id": "artifact-cuantico-1",
        "version": 1,
        "path": ".artifacts/1bc4c77c41517f0cfe36e1cc87a5a9f27b01e0ca39e3d02522c58d626f997da9.csv",
        "name": "cuantico-1.csv",
        "checksum": "1bc4c77c41517f0cfe36e1cc87a5a9f27b01e0ca39e3d02522c58d626f997da9",
        "size": 36,
        "mediaType": "text/csv",
        "kind": "science.spectrum",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-1",
          "checksum": "1bc4c77c41517f0cfe36e1cc87a5a9f27b01e0ca39e3d02522c58d626f997da9",
          "format": "csv",
          "stream": {
            "id": "cuantico-stream-1",
            "frameId": "frame-1",
            "frameIndex": 1
          }
        },
        "fixtureBytes": "frequency,intensity\n100,0.6\n200,0.9\n"
      }
    ],
    "input": {
      "version": 1,
      "requestId": "cuantico-request-1",
      "operationId": "cuantico-operation-1",
      "actionId": "elagente.viewer.select",
      "target": {
        "artifactId": "artifact-cuantico-0",
        "objectId": "urn:cuantico:spectrum:1",
        "sourceRevision": "native-revision-0",
        "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
        "streamId": "cuantico-stream-1",
        "frameId": "frame-0",
        "frameIndex": 0
      },
      "payload": {
        "selectedIds": [
          "sample-100"
        ]
      },
      "kind": "selection",
      "submission": "explicit"
    },
    "acknowledgements": [
      {
        "version": 1,
        "requestId": "cuantico-request-1",
        "operationId": "cuantico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-cuantico-0",
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "streamId": "cuantico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "accepted"
      },
      {
        "version": 1,
        "requestId": "cuantico-request-1",
        "operationId": "cuantico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-cuantico-0",
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "streamId": "cuantico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "applied",
        "result": {
          "selectedIds": [
            "sample-100"
          ]
        }
      }
    ],
    "progress": {
      "version": 1,
      "callId": "tool-fixture-1",
      "label": "Scientific calculation",
      "status": "completed",
      "arguments": {
        "precision": "standard"
      },
      "startedAt": "2026-10-04T00:00:00.000Z",
      "completedAt": "2026-10-04T00:00:01.000Z",
      "resultSummary": "Two immutable frames",
      "logSummary": "Task complete",
      "artifactIds": [
        "artifact-cuantico-0",
        "artifact-cuantico-1"
      ],
      "completed": 2,
      "total": 2,
      "unit": "frames"
    },
    "usage": {
      "version": 1,
      "scope": "turn",
      "scopeId": "turn-fixture-1",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "available",
      "tokens": {
        "input": 20,
        "output": 10,
        "cacheRead": 5
      }
    },
    "unavailableUsage": {
      "version": 1,
      "scope": "room",
      "scopeId": "thr-fixture",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "unavailable"
    },
    "unknownItem": {
      "id": "unknown-fixture",
      "kind": "science.unknown",
      "text": "Scientific data available for download",
      "artifact": {
        "id": "artifact-cuantico-0",
        "version": 1,
        "path": ".artifacts/971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d.csv",
        "name": "cuantico-0.csv",
        "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
        "size": 36,
        "mediaType": "text/csv",
        "kind": "science.spectrum",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "format": "csv",
          "stream": {
            "id": "cuantico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          }
        },
        "fixtureBytes": "frequency,intensity\n100,0.5\n200,1.0\n"
      },
      "extension": {
        "version": 1,
        "type": "second-agent.unrecognized",
        "data": {
          "summary": "Preserve metadata; no executable renderer"
        }
      }
    }
  }
};
function freeze(v) { if (v && typeof v === "object") { Object.values(v).forEach(freeze); Object.freeze(v); } return v; }
export const EXTENSION_FIXTURES = freeze(fixtures);
