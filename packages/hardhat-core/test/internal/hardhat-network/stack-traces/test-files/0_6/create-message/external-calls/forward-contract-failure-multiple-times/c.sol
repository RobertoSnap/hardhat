pragma solidity ^0.6.0;

import "./d.sol";

contract C {

  constructor() public {
    D d = new D();
    d.callE();
  }

}
