// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Voting} from "../src/Voting.sol";

contract VotingTest is Test {
    Voting voting;

    address admin = address(0x1);
    address voter1 = address(0x2);
    address candidate1 = address(0x3);

    function setUp() public {
        // Deploy Voting contract as admin
        vm.startPrank(admin);
        voting = new Voting();
        vm.stopPrank();

        // Register a voter
        vm.startPrank(voter1);
        voting.registerVoter("Alice", "Voter Alice", "Aadhar123");
        vm.stopPrank();

        // Register a candidate
        vm.startPrank(candidate1);
        voting.registerCandidate("Bob", "Candidate Bob", "AadharC1", "PartyX", "Manifesto1");
        vm.stopPrank();
    }

    function testChangeVoterStatus() public {
        // Approve voter
        vm.startPrank(admin);
        voting.changeStatus(voter1, false, Voting.PossibleStatus.Approved);
        vm.stopPrank();

        (, bool isRegistered,, , Voting.PossibleStatus status, string memory name,,) = voting.voterMapping(voter1);
        assertTrue(isRegistered);
        assertEq(uint(status), uint(Voting.PossibleStatus.Approved));
        assertEq(name, "Alice");

        // Reject voter
        vm.startPrank(admin);
        voting.changeStatus(voter1, false, Voting.PossibleStatus.Rejected);
        vm.stopPrank();

        (, isRegistered,, , status, name,,) = voting.voterMapping(voter1);
        assertEq(uint(status), uint(Voting.PossibleStatus.Rejected));
        assertEq(name, "Alice");
    }

    function testChangeCandidateStatus() public {
        // Approve candidate
        vm.startPrank(admin);
        voting.changeStatus(candidate1, true, Voting.PossibleStatus.Approved);
        vm.stopPrank();

        (bool isRegistered, Voting.PossibleStatus status, string memory name,,,,, ) = voting.candidateMapping(candidate1);
        assertTrue(isRegistered);
        assertEq(uint(status), uint(Voting.PossibleStatus.Approved));
        assertEq(name, "Bob");

        // Reject candidate
        vm.startPrank(admin);
        voting.changeStatus(candidate1, true, Voting.PossibleStatus.Rejected);
        vm.stopPrank();

        (, status, name,,,,, ) = voting.candidateMapping(candidate1);
        assertEq(uint(status), uint(Voting.PossibleStatus.Rejected));
        assertEq(name, "Bob");
    }

    function test_Revert_NonAdminCannotChangeStatus() public {
        vm.startPrank(voter1);
        vm.expectRevert("Only Admin can call this function");
        voting.changeStatus(voter1, false, Voting.PossibleStatus.Approved);
        vm.stopPrank();
    }

    function test_Revert_CannotChangeStatusForUnregistered() public {
        address unknown = address(0x99);

        vm.startPrank(admin);
        vm.expectRevert("Voter not registered"); // because _isCandidate=false
        voting.changeStatus(unknown, false, Voting.PossibleStatus.Approved);
        vm.stopPrank();
    }

}
