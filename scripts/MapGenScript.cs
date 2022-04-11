using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class MapGenScript : MonoBehaviour
{
  public int width;
  public int height;

  public string seed;
  public bool useRandSeed;

  [Range(0,100)]
  public int randFillPercent;

  int [,] map;

  void Start() {
    GenerateMap();
  } 

  void GenerateMap() {
    map = new int[width,height];
    RandFillMap();
  }

  void RandFillMap() {
    if (useRandSeed) {
      seed = Time.time.ToString();
    }

    System.Random rng = new System.Random(seed.GetHashCode());

    for (int i = 0; i < width; i++) {
      for (int j = 0; j < height; j++) {
        if (rng.Next(0,100) < randFillPercent) {
          map[i,j] = 0;
        } else {
          map[i,j] = 1;
        }
        
      }
    }
  }

  void onDrawGizmos() {
    if (map != null) {
      for (int i = 0; i < width; i++) {
        for (int j = 0; j < height; j++) {
          if (map[i,j] == 1) {
            Gizmos.color = Color.black;
            
          } else {
            Gizmos.color = Color.white;
          }
          Vector3 pos = new Vector3(-width/2 + i + 0.5f, 0, -height/2 + j + 0.5f);
          Gizmos.DrawCube(pos, Vector3.one);
        }
      }
    }
  }

}
