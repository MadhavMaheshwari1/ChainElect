// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    enum PossibleStatus { Pending, Approved, Rejected }

    uint public electionStart;
    uint public electionEnd;
    bool public isElectionActive;

    uint public totalRegisteredCandidates;
    uint public totalRegisteredVoters;
    uint public totalVotersWhoVoted;

    struct Voter {
        bool hasVoted;
        bool isRegistered;
        uint registeredAt;
        address votedForCandidate;
        PossibleStatus status;
        string name;
        string description;
        string aadharPhotoHash;
    }

    struct Candidate {
        bool isRegistered;
        PossibleStatus status;
        string name;
        string description;
        string manifesto;
        string partyName;
        string aadharPhotoHash;
        uint votes;
    }

    mapping(address => Voter) public voterMapping;
    mapping(address => Candidate) public candidateMapping;

    address[] public candidateList;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only Admin can call this function");
        _;
    }

    modifier notAdmin() {
        require(msg.sender != admin, "Admin cannot call this function");
        _;
    }

    function setElectionTime(uint _start, uint _end) external onlyAdmin {
        require(_start < _end, "Election start time should be less than end time");
        electionStart = _start;
        electionEnd = _end;
    }

    function changeStatus(address _user, bool _isCandidate, PossibleStatus _status) external onlyAdmin {
        if (_isCandidate) {
            require(candidateMapping[_user].isRegistered, "Candidate not registered");
            candidateMapping[_user].status = _status;
        } else {
            require(voterMapping[_user].isRegistered, "Voter not registered");
            voterMapping[_user].status = _status;
        }
    }

    function setElectionStatus(bool _status) external onlyAdmin {
        isElectionActive = _status;
    }

    function registerVoter(
        string memory _name,
        string memory _description,
        string memory _aadharHash
    ) external notAdmin {
        require(!voterMapping[msg.sender].isRegistered, "Already registered");

        totalRegisteredVoters++;
        voterMapping[msg.sender] = Voter({
            hasVoted: false,
            isRegistered: true,
            registeredAt: block.timestamp,
            votedForCandidate: address(0),
            status: PossibleStatus.Pending,
            name: _name,
            description: _description,
            aadharPhotoHash: _aadharHash
        });
    }

    function registerCandidate(
        string memory _name,
        string memory _description,
        string memory _aadharHash,
        string memory _partyName,
        string memory _manifesto
    ) external notAdmin {
        require(!candidateMapping[msg.sender].isRegistered, "Already registered");

        candidateMapping[msg.sender] = Candidate({
            isRegistered: true,
            status: PossibleStatus.Pending,
            name: _name,
            description: _description,
            aadharPhotoHash: _aadharHash,
            manifesto: _manifesto,
            partyName: _partyName,
            votes: 0
        });

        candidateList.push(msg.sender);
        totalRegisteredCandidates++;
    }

    function voteForCandidate(address _candidate) external notAdmin {
        require(!voterMapping[msg.sender].hasVoted, "Voter already voted");
        require(candidateMapping[_candidate].isRegistered, "Invalid candidate");

        voterMapping[msg.sender].hasVoted = true;
        voterMapping[msg.sender].votedForCandidate = _candidate;

        candidateMapping[_candidate].votes++;
        totalVotersWhoVoted++;
    }

    function getCandidates() external view returns (address[] memory) {
        return candidateList;
    }
}
