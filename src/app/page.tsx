'use client';
import { fromBech32, toBech32 } from '@cosmjs/encoding';
import { useState } from 'react'


function tryConvert(address: string, targetPrefix: string): string {
  if (targetPrefix === "")
    return "";

  try {
    let bech32 = fromBech32(address);
    return toBech32(targetPrefix, bech32.data);
  } catch { }

  return "";
}

export default function Home() {
  let [userAddress, setUserAddress] = useState("cosmos1xtejvu7d53fl8ux68ghkv22wxhcsm58sa9dcne");
  let [prefixes, setPrefixes] = useState(["osmo", "celestia"]);

  return (
    <>
      <input
        style={{ "width": "330px"}}
        placeholder='Paste your cosmos/osmosis/celestia/etc address'
        onChange={(e) => setUserAddress(e.target.value)} value={userAddress} />
      <br />
      {prefixes.map((prefix, ind) => {
        return (
          <div key={ind}>
            <div style={{ display: "inline-block" }} key={prefix}>
              <input
                value={prefix}
                autoFocus
                style={{ width: "330px", marginRight: "10px"}}
                onChange={(e) => {
                  let newPrefixes = [...prefixes];
                  newPrefixes[ind] = e.target.value;
                  setPrefixes(newPrefixes);
                }}
              />
              <label>{tryConvert(userAddress, prefix)}</label>
            </div>
          </div>
        )
      })}
      <br />
      <button onClick={() => {
        let newPrefixes = [...prefixes];
        newPrefixes.push("");
        setPrefixes(newPrefixes);
      }}>Add</button>
    </>
  )
}
