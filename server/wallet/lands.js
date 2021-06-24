const CoinUtil = require('../coin-util');

class Lands {
  constructor(id, timestamp, titleNo, geoData, ownerData, landSize, hash, value) {
    this.id = id;
    this.timestamp = timestamp;
    this.titleNo = titleNo;
    this.geoData = geoData;
    this.ownerData = ownerData; //Group
    this.landSize = landSize;
    this.hash = hash;
    this.value = value;
    // this.container = []; add to wallet
  }

  static addLand(titleNo, geoData, ownerData, landSize, value){
    // Verify if land exist in the container
    const id = CoinUtil.id();
    const timestamp = Date.now();
    const hash = CoinUtil.hash(`${titleNo}${geoData}${ownerData}${landSize}`);

    return new this(
      id,
      timestamp,
      titleNo,
      geoData,
      ownerData,
      landSize,
      hash,
      value
    );
  }


}

module.exports = Lands;
