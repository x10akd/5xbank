import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



const BankSearch = () => {
  const [banks, setBanks] = useState([]);
  const [bankCode, setBankCode] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState("複製此頁面連結");
  const [copyCodeText, setCopyCodeText] = useState("複製代碼");

  const navigate = useNavigate();
  const { bankCode: paramBankCode, branchCode, branchName } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(`${API_URL}/banks/`);
        setBanks(
          response.data.map((bank) => ({
            value: bank.code,
            label: `${bank.code} ${bank.name}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      if (paramBankCode) {
        try {
          const response = await axios.get(
            `${API_URL}/${paramBankCode}/branches/`
          );
          setBranches(
            response.data.branches.map((branch) => ({
              value: branch.branch_code,
              label: branch.name,
            }))
          );
          setBankCode(paramBankCode);
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      }
    };

    fetchBranches();
  }, [paramBankCode]);

  useEffect(() => {
    const fetchBranchDetails = async () => {
      if (paramBankCode && branchCode && branchName) {
        try {
          const response = await axios.get(
            `${API_URL}/${paramBankCode}/${branchCode}/${encodeURIComponent(
              branchName
            )}.html`
          );
          setSelectedBranch(response.data);
        } catch (error) {
          console.error("Error fetching branch details:", error);
        }
      }
    };

    fetchBranchDetails();
  }, [paramBankCode, branchCode, branchName]);

  const handleBankSelect = async (selectedOption) => {
    const selectedBankCode = selectedOption ? selectedOption.value : "";
    setBankCode(selectedBankCode);

    if (selectedBankCode) {
      try {
        const response = await axios.get(
          `${API_URL}/${selectedBankCode}/branches/`
        );
        setBranches(
          response.data.branches.map((branch) => ({
            value: branch.branch_code,
            label: branch.name,
          }))
        );
        setSelectedBranch(null);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    } else {
      setBranches([]);
      setSelectedBranch(null);
    }
  };

  const handleBranchSelect = async (selectedOption) => {
    const branchCode = selectedOption ? selectedOption.value : "";
    const branchName = selectedOption ? selectedOption.label : "";

    if (branchCode) {
      try {
        const response = await axios.get(
          `${API_URL}/${bankCode}/${branchCode}/${encodeURIComponent(
            branchName
          )}.html`
        );
        setSelectedBranch(response.data);
        navigate(
          `/${bankCode}/${branchCode}/${encodeURIComponent(branchName)}.html`
        );
      } catch (error) {
        console.error("Error fetching branch details:", error);
      }
    } else {
      setSelectedBranch(null);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedBranch.branch_code);
    setCopyCodeText("已複製");
    setTimeout(() => {
      setCopyCodeText("複製代碼");
    }, 2000);
  };
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyButtonText("已複製");
    setTimeout(() => {
      setCopyButtonText("複製此頁面連結");
    }, 2000);
  };

  const handleReset = () => {
    setBankCode("");
    setBranches([]);
    setSelectedBranch(null);
    navigate("/");
  };

  return (
    <div>
      <h1>台灣銀行代碼查詢</h1>
      <div>
        <label>銀行名稱</label>
        <Select
          options={banks}
          onChange={handleBankSelect}
          placeholder="請輸入關鍵字或銀行代碼..."
          isClearable
          classNamePrefix="Select"
        />
      </div>

      <div>
        <label>分行名稱</label>
        <Select
          options={branches}
          onChange={handleBranchSelect}
          placeholder="請選擇分行名稱"
          isClearable
          isDisabled={!bankCode}
          classNamePrefix="Select"
        />
      </div>

      {selectedBranch && (
        <div>
          <div className="branch-info">
            <h2>{selectedBranch.name}</h2>
            <p>
              分行代碼：{selectedBranch.branch_code} <button onClick={handleCopyCode}>{copyCodeText}</button>
            </p>
            <p>地址：{selectedBranch.address}</p>
            <p>電話：{selectedBranch.tel}</p>
          </div>
          <div>
            <button onClick={handleReset}>重新查詢</button>
            <button onClick={handleCopyUrl}>{copyButtonText}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSearch;
