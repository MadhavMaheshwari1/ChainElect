// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Voting} from "../src/Voting.sol";

contract DeployVoting is Script {
    function run() external {
        vm.startBroadcast(); // starts sending transactions from your wallet

        Voting voting = new Voting();

        vm.stopBroadcast(); // stops sending transactions
    }
}
