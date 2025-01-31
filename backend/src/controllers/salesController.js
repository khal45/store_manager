import sales from "../database/saleDb.js";
import users from "../database/usersDb.js";
import { v4 as uuidv4 } from "uuid";
const uniqueId = uuidv4();

const getAllSales = (req, res) => {
  res.status(200).json(sales);
};

const getAttendantSales = (req, res) => {
  const { attendantId } = req.params;
  const foundUser = users.find((user) => user.id === attendantId);
  if (!foundUser) {
    return res.status(404).json({ message: "Attendant not found" });
  } else {
    if (foundUser.role === "Admin") {
      return res
        .status(400)
        .json({ message: "Admin cannot have sale records!" });
    } else {
      const attendantSales = sales.filter(
        (sale) => sale.attendantId === attendantId
      );
      res.status(200).json(attendantSales);
    }
  }
};

const getSaleById = (req, res) => {
  const { saleId } = req.params;
  const foundSaleRecord = sales.find((sale) => sale.saleId === saleId);
  const attendantId = req.user.id;
  if (!foundSaleRecord) {
    res.status(404).json({ message: "Sale Record not found!" });
  } else {
    if (
      attendantId === foundSaleRecord.attendantId ||
      req.user.role === "Admin"
    ) {
      res.json(foundSaleRecord);
    } else {
      res
        .status(403)
        .json({ message: "Attendant does not have access to sale record" });
    }
  }
};

const createSale = (req, res) => {
  const { productName, quantity, paymentMethod, unitPrice, status } = req.body;
  const requiredFields = [
    "productName",
    "quantity",
    "paymentMethod",
    "unitPrice",
    "status",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(422).json({
      success: false,
      message: "All fields are required",
    });
  } else {
    let newOrder = {
      productName,
      saleId: uniqueId,
      date: new Date().toDateString(),
      quantity,
      paymentMethod,
      unitPrice,
      totalAmount: unitPrice * quantity,
      status,
      attendantId: req.user.id,
    };

    sales.push(newOrder);
    res
      .status(200)
      .json({
        success: true,
        message: "Sale record created successfully!",
        newOrder,
      });
  }
};

export { getAllSales, getAttendantSales, createSale, getSaleById };
